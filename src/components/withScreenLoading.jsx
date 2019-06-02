import React from 'react';
import LoadingComponent from './loading/Loading'

const withScreenLoading = WrappedComponent => {
    return class Loading extends React.PureComponent {
        render() {
            if(this.props.loading) return <LoadingComponent />
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withScreenLoading