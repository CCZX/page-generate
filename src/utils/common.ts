type varType = 'number' | 'string' | 'undefined' | 'null' | 'function' | 'array' | 'object'

export function uuid() {
  function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function isType(type: varType) {
	return (target: any) => {
		const _type = Object.prototype.toString.call(target)
		return _type.toLowerCase() === `[object ${type}]`
	}
}

export function isEmpty(target: any) {
	if (!target) {
		return true
	}
	if (Array.isArray(target)) {
		return target.length === 0
	} else {
		return Object.keys(target).length === 0
	}
}

export function findParentNode(e: HTMLElement, parentCls: string) {
	let curr: HTMLElement | null = e
	while (curr) {
		if (curr.classList.contains(parentCls)) {
			return curr
		}
		curr = curr.parentElement
	}
	return null
}
