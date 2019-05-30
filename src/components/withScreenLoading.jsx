import React from 'react';
import Loading from './loading/Loading'

const withScreenLoading = WrappedComponent => {
    return class Loading extends React.PureComponent {
        render() {
            if(this.props.loading) return <Loading />
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withScreenLoading