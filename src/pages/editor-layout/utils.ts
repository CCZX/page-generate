import { createContext } from 'react'

export function processRenderCmpProps(cmpProps: ICmpSchemaProp[]) {
  return cmpProps.reduce<{[key: string]: string | boolean | any[]}>((propsMap, currProp) => {
    return {...propsMap, [currProp.key]: currProp.value ?? '' }
  }, {})
}

export const EditorContext = createContext({})
