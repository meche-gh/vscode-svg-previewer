import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import messageBroker from './messaging'
import ToolbarContainer from './containers/ToolbarContainer'
import PreviewContainer from './containers/PreviewContainer'
import { actions, ISource, IState } from './store'

interface AppProps {
    updateSource: Function & ((...args: any[]) => any);
    updateSettings: Function & ((...args: any[]) => any);
    source: ISource;
}

const mapToProps = (state: IState) => ({ source: state.source })

class App extends Component<AppProps> {
  componentDidMount () {
    messageBroker.addListener('source:update', this.props.updateSource)
  }

  componentWillUnmount () {
    messageBroker.removeListener('source:update', this.props.updateSource)
  }

  render () {
    return (
      <div className='layout'>
        <ToolbarContainer />
        {this.props.source.uri && <PreviewContainer />}
      </div>
    )
  }
}

export default connect(mapToProps, actions)(App)
