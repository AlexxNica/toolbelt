import {splitAt, flatten, merge, zipObj, values, __} from 'ramda'
import {apps} from '../../../clients'

const {getAppSettings, saveAppSettings} = apps

const castValue = value => {
  let parsedValue
  try {
    parsedValue = JSON.parse(value)
  } catch (err) {
    parsedValue = value
  }
  const numberCast = Number(value)
  return isNaN(numberCast) ? parsedValue : numberCast
}

const transformCommandsToObj = (commandSettings) => {
  const k = []
  const v = []
  for (const [idx, val] of commandSettings.entries()) {
    const realValue = castValue(val)
    if (idx % 2) {
      v.push(realValue)
    } else {
      k.push(realValue)
    }
  }
  return zipObj(k, v)
}

export default (app: string, _field, _value, options) => {
  const [, commands] = splitAt(1, flatten(values(options)))
  const commandSettings = transformCommandsToObj(commands)
  return getAppSettings(app)
    .then(merge(__, commandSettings))
    .then(newSettings => JSON.stringify(newSettings, null, 2))
    .tap(newSettings => saveAppSettings(app, newSettings))
    .tap(console.log)
}
