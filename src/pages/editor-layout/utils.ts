import { createContext } from 'react'

export function processRenderCmpProps(cmpProps: ICmpSchemaProp[]) {
  return cmpProps.reduce<{[key: string]: string}>((propsMap, currProp) => {
    return {...propsMap, [currProp.key]: currProp.defaultValue || ''}
  }, {})
}

export const EditorContext = createContext({})
