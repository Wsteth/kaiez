
import fs from 'fs'
import path from 'path'

export default {
    debug: (text: string, printToScreen: boolean, ...args: any[]) => {
        const formatText = `${formatDate()} - ${text}`
        if (printToScreen === true) {
            // tslint:disable-next-line
            console.log(formatText, args)
        }
    },

}

const formatDate = (): string => {
    const date: Date = new Date()
    const dateSpec = {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString().padStart(2, '0'),
        day: date.getDate().toString().padStart(2, '0'),
        hour: date.getHours().toString().padStart(2, '0'),
        minute: date.getMinutes().toString().padStart(2, '0'),
        second: date.getSeconds().toString().padStart(2, '0'),
    }

    const dateFormat =
        `${dateSpec.year}-${dateSpec.month}-${dateSpec.day} ` +
        `${dateSpec.hour}:${dateSpec.minute}:${dateSpec.second}`

    return dateFormat
}