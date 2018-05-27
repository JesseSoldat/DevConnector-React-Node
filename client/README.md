size: PropTypes.oneOfType([
PropTypes.string,
PropTypes.number
]),

const composeEnhancers = window.**REDUX_DEVTOOLS_EXTENSION_COMPOSE** || compose;
const store = createStore(
rootReducer,
initialState,
composeEnhancers(applyMiddleware(...middlewares))
);
