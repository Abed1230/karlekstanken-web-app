import React from 'react';
import { withRouter } from 'react-router-dom';
import { analytics } from './FirebaseData';

class AnalyticsPageViewLogger extends React.Component {
    componentDidUpdate({ history }) {
        if (history.action === 'PUSH') {
            analytics.logEvent('page_view', {
                'page_title': document.title,
                'page_location': window.location.href,
                'page_path': window.location.pathname
            });
        }
    }

    render() {
        return null;
    }
}

export default withRouter(AnalyticsPageViewLogger);