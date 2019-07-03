import {
    PREV_SCENE
}
    from './types';

export const previousScene = (prevScene) => {
    if (prevScene === 'messageScreen') {
        return {
            type: PREV_SCENE,
            payload: 'message'
        };
    }
    return {
        type: PREV_SCENE,
        payload: 'search'
    };
};
