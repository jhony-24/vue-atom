export function haveProperty<ObjectVal,PropVal>(obj : ObjectVal, prop : PropVal) : boolean {
    return (obj as any).hasOwnProperty("handler");
}