import { createStore, combineReducers, applyMiddleware } from 'redux';

import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import { Comments } from "./comments";
import { Dishes } from "./dishes";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            leaders: Leaders,
            promotions: Promotions,
            comments: Comments,
            dishes: Dishes,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}