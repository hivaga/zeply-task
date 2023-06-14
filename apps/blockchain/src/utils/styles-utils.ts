
export function addStyles(...rest:string[]){
  return rest.reduce((prev,next) => {
    return `${prev} ${next}`;
  }, '')
}
