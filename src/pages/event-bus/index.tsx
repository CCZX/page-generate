export class Publisher {
  watchers: {
    [key: string]: {callback: noop, name: string}[]
  } = {}

  on(type: string, callback: noop, name: string) {
    if (this.watchers[type]) {
      const hasWatcher = this.watchers[type].some(w => w.name === name)
      if (!hasWatcher) {
        this.watchers[type].push({
          callback,
          name,
        })
      }
      return
    }
    this.watchers[type] = [{callback, name}]
  }

  emit(type: string, ...args: any[]) {
    const typeWatcher = this.watchers[type]
    typeWatcher.forEach(item => {
      item.callback.apply(null, args)
    })
  }
}

export default new Publisher
