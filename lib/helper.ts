export const extractValuesAsObject = <T extends { name: string; value: any }>(
	data: T[],
	names: string[]
): Record<string, T['value']> => {
	const nameSet = new Set(names) // Use a Set for efficient lookup
	return data.reduce((acc, item) => {
		if (nameSet.has(item.name)) {
			acc[item.name] = item.value // Add key-value pair to the accumulator
		}
		return acc
	}, {} as Record<string, T['value']>)
}

export const extractContentWithinBrackets = (str: string) => {
	const regex = /(?<=<)(.*?)(?=>)/
	const result = str.match(regex)
	return result ? result[0] : null // Return null if no match is found
}
