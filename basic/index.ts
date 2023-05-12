import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
  bindActionCreators,
  Reducer,
  StoreEnhancer,
  Middleware,
} from "redux"

const louder = (str: string) => str.toUpperCase()
const repeat = (str: string) => str.repeat(3)
const embolder = (str: string) => str.bold()

const doAll = compose(embolder, repeat, louder)
// console.log(doAll("some stuff"))

const initState = { value: Math.floor(Math.random() * 100) }
function inc(amout: number): ActionInc {
  return {
    type: "INC",
    payload: amout,
  }
}

function add(): ActionInc {
  return {
    type: "ADD",
    payload: 111,
  }
}

type ActionInc = { type: "INC" | "ADD"; payload: number; meta?: string; error?: string }

const reducer: Reducer<typeof initState, ActionInc> = (state = initState, action) => {
  switch (action.type) {
    case "INC":
      return { value: state.value + action.payload }
    case "ADD":
      return { value: state.value + action.payload }
  }
}

const subscriber = () => console.log("Sub", store.getState())

const logMiddleware: Middleware<{}, typeof initState> =  (store) => (next) => (action) =>{
  console.log("before", store.getState(), action)
  next(action)
  console.log("after", store.getState(), action)
}

const store = createStore(reducer, applyMiddleware(logMiddleware))

const unsubscribe = store.subscribe(subscriber)

console.log(store)
console.log(store.getState())

store.dispatch({ type: "INC", payload: 123 })
console.log(store.getState())

store.dispatch(inc(500 ))
console.log(store.getState())

store.dispatch(inc(500 ))
store.dispatch(inc(500 ))
unsubscribe()
store.dispatch(inc(500 ))
store.dispatch(inc(500 ))
store.dispatch(inc(500 ))

// const unsubscribe2 = store.subscribe(subscriber)

store.dispatch(inc(500 ))
store.dispatch(inc(500 ))

const actions = bindActionCreators(
  {
    inc,
    add,
  },
  store.dispatch,
)

actions.inc(100)
actions.add()
actions.add()
actions.inc(100)
actions.inc(1001111)

inc(7777)
inc(7777)
inc(7777)

// function noUnusedAction(action: never) {
//   throw new Error("Must never run this code")
// }

