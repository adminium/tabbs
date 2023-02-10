import React from 'react';
import loadable from '@loadable/component';
// import { Spin } from '@arco-design/web-react';
// import styles from '../style/layout.module.less';

// https://github.com/gregberge/loadable-components/pull/226
function load(loader: any, options: any) {
    const Component = loadable(loader, options);

    Component.preload = loader.requireAsync || loader;

    return Component;
}

function LoadingComponent(props: {
    error: boolean;
    timedOut: boolean;
    pastDelay: boolean;
}) {
    if (props.error) {
        console.error(props.error);
        return null;
    }
    return (
        <div>
            {/*<div className={styles.spin}>*/}
            {/*<Spin />*/}
            Loading......
        </div>
    );
}

export default (loader: any) =>
    load(loader, {
        fallback: LoadingComponent({
            pastDelay: true,
            error: false,
            timedOut: false,
        }),
    });
