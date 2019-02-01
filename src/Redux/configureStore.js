import { createStore, combineReducers } from 'redux';

import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import { Comments } from "./comments";
import { Dishes } from "./dishes";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            leaders: Leaders,
            promotions: Promotions,
            comments: Comments,
            dishes: Dishes
        })
    );

    return store;
}