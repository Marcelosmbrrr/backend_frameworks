export function DeepCopy(value: Object) {
    return JSON.parse(JSON.stringify(value));
}