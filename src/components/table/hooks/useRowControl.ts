import {useCallback, useEffect, useState} from 'react'
import {TOrder} from '../utils/type.ts'

interface Props<T> {
    data: T[]
}

interface IState<T> {
    rows: T[]
    sort: {
        order: TOrder
        name: keyof T | string
    }
    columnFilter: Partial<T>
    searchFilter: {
        text: string | undefined
        columnsSearchRemove: (keyof T)[] | undefined
    }
}

export default function useRowControl<T>({data}: Props<T>) {
    const [state, setState] = useState<IState<T>>({
        rows: data,
        sort: {
            order: 'asc',
            name: '',
        },
        columnFilter: {},
        searchFilter: {
            text: undefined,
            columnsSearchRemove: undefined,
        },
    })

    /**
     * After loading or updating data, verify the state value and then return the list.
     */
    useEffect(() => {
        let list: T[] = []

        if (data.length !== 0) {
            if (Object.entries(state.columnFilter).length > 0) {
                list = doColumnFilter(state.columnFilter)
            }

            if (state.searchFilter.text !== undefined) {
                list = doSearchFilter(
                    state.searchFilter.text,
                    state.searchFilter.columnsSearchRemove,
                )
            }

            if (
                Object.entries(state.columnFilter).length === 0 &&
                state.searchFilter.text === undefined
            ) {
                list = data
                if (state.sort.name !== '') {
                    doSort(list, state.sort.name as keyof T, state.sort.order)
                }
            }

            setState((prevState) => ({
                ...prevState,
                rows: list,
            }))
        } else {
            if (JSON.stringify(state.rows) !== JSON.stringify(data)) {
                setState((prevState) => ({
                    ...prevState,
                    rows: list,
                }))
            }
        }
    }, [data])

    /**
     * After changing the column filter, verify the state value and then return the list.
     */
    useEffect(() => {
        if (Object.entries(state.columnFilter).length > 0) {
            setState((prevState) => ({
                ...prevState,
                rows: doColumnFilter(state.columnFilter),
            }))
        }
    }, [state.columnFilter])

    /**
     * After changing the search filter, verify the state value and then return the list.
     */
    useEffect(() => {
        if (state.searchFilter.text !== undefined) {
            doSearchFilter(state.searchFilter.text, state.searchFilter.columnsSearchRemove)
        }
    }, [state.searchFilter])

    /**
     * Sorts based on column name and order value.
     */
    const handleSortChange = useCallback(
        (name: keyof T, order: TOrder) => {
            let orderKey: TOrder = order === 'asc' ? 'desc' : 'asc'

            if (state.sort.name !== name) {
                orderKey = 'asc'
            }

            doSort(state.rows, name, orderKey)

            setState((prevState) => ({
                ...prevState,
                sort: {
                    name: name,
                    order: orderKey,
                },
            }))
        },
        [state],
    )

    /**
     * After changing the column name and value, sets individual columns to a new value and then returns the list.
     */
    const handleColumnFilterChange = useCallback(
        (key: keyof T, value: any) => {
            setState((prevState) => ({
                ...prevState,
                columnFilter: {...prevState.columnFilter, [key]: value},
                searchFilter: {
                    text: undefined,
                    columnsSearchRemove: undefined,
                },
            }))
        },
        [state],
    )

    /**
     * After changing multiple columns at once, sets the column filter.
     */
    const handleSetColumnsFilter = useCallback(
        (columns: Partial<T>) => {
            setState((prevState) => ({
                ...prevState,
                columnFilter: columns,
                searchFilter: {
                    text: undefined,
                    columnsSearchRemove: undefined,
                },
            }))
        },
        [state],
    )

    /**
     * After changing the text, updates the search filter state.
     */
    const handleSearchFilterChange = useCallback(
        (text: string, columnsSearchRemove?: (keyof T)[]) => {
            setState((prevState) => ({
                ...prevState,
                rows: doSearchFilter(text, columnsSearchRemove),
                columnFilter: {},
                searchFilter: {
                    text: text,
                    columnsSearchRemove: columnsSearchRemove,
                },
            }))
        },
        [state],
    )

    /**
     * Filters based on column name and value, then returns the list.
     * If a sort state is present, it also adjusts the order.
     */
    const doColumnFilter = (columns: Partial<T>): T[] => {
        const list: T[] = data.filter((row) => {
            let matchNum: number = Object.entries(columns).length

            Object.entries(columns).every(([key, value]) => {
                const rowValue = String(row[key as keyof T])
                const objectValue = String(value)

                if (objectValue !== '') {
                    if (rowValue.toLowerCase().includes(objectValue.toLowerCase())) {
                        matchNum--
                    }
                }

                if (objectValue === '') {
                    matchNum--
                }

                return true
            })

            if (matchNum === 0) {
                return row
            }
        })

        doSort(list, state.sort.name as keyof T, state.sort.order)

        return list
    }

    /**
     * Filters based on text, iterates through all columns and their values,
     * and if there is a match, adds the row and returns the list.
     */
    const doSearchFilter = (text: string, columnsSearchRemove?: (keyof T)[]): T[] => {
        const list: T[] = data.filter((row) => {
            let match: boolean = false

            Object.entries(row as keyof T).every(([key, value]) => {
                const rowValue = String(value)
                if (
                    !columnsSearchRemove?.includes(key as keyof T) &&
                    rowValue.toLowerCase().includes(text.toLowerCase())
                ) {
                    match = true
                }
                return true
            })

            if (match) {
                return row
            }
        })

        doSort(list, state.sort.name as keyof T, state.sort.order)

        return list
    }

    /**
     * Performs row sorting.
     */
    const doSort = (list: T[], orderBy: keyof T, orderKey: TOrder) => {
        list.sort((a, b) => comparator(a, b, orderBy, orderKey))
    }

    /**
     * Compares rows.
     */
    const comparator = (a: T, b: T, orderBy: keyof T, orderKey: TOrder) => {
        const aValue = a[orderBy]
        const bValue = b[orderBy]

        const aNum =
            typeof aValue === 'string' && !isNaN(parseFloat(aValue))
                ? parseFloat(aValue)
                : (aValue as string)
        const bNum =
            typeof bValue === 'string' && !isNaN(parseFloat(bValue))
                ? parseFloat(bValue)
                : (bValue as string)

        if (typeof aNum === 'number' && typeof bNum === 'number') {
            return orderKey === 'asc' ? aNum - bNum : bNum - aNum
        }

        if (bValue < aValue) {
            return orderKey === 'asc' ? -1 : 1
        }

        if (bValue > aValue) {
            return orderKey === 'asc' ? 1 : -1
        }

        return 0
    }

    /**
     * Resets filters to default settings.
     */
    const clearFilter = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            rows: data,
            columnFilter: {},
            searchFilter: {
                text: undefined,
                columnsSearchRemove: undefined,
            },
        }))
    }, [state])

    /**
     * Resets sort to default settings.
     */
    const clearSort = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            rows: data,
            sort: {
                order: 'asc',
                name: '',
            },
        }))
    }, [state])

    return {
        rows: state.rows,
        filter: {
            columnFilterState: state.columnFilter,
            searchFilterState: state.searchFilter,
            handleSetColumnsFilter,
            handleSearchFilterChange,
            handleColumnFilterChange,
            clearFilter,
        },
        sort: {
            sortState: state.sort,
            handleSortChange,
            clearSort,
        },
    }
}
