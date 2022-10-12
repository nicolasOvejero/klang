import { Component, createRef } from 'react';
import './action.style.scss';

export type ActionProps = {
    actions: ActionModel[];
}

export type ActionModel = {
    label: string;
    action: ActionType;
    mail?: string;
}

type ActionType = 'mail';

class Action extends Component<ActionProps, { isOverflowMenuOpen: boolean }> {
    mainDivRef: any;

    constructor(props: ActionProps) {
        super(props);

        this.mainDivRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            isOverflowMenuOpen: false
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event: any) {
        if (this.state.isOverflowMenuOpen && this.mainDivRef &&
            !this.mainDivRef.current.contains(event.target)) {
            this.setState({ isOverflowMenuOpen: !this.state.isOverflowMenuOpen });
        }
    }

    clickItem(action: ActionType, mail?: string) {
        this.setState({
            isOverflowMenuOpen: false
        })

        if (action === 'mail') {
            window.open(`mailto:${mail}`, '_blank');
        }
    }

    render() {
        return (
            <div
                ref={ this.mainDivRef }
                className='actions'
            >
                <span
                    className='icon material-symbols-outlined'
                    onClick={() => this.setState({ isOverflowMenuOpen: !this.state.isOverflowMenuOpen })}>
                    more_vert
                </span>
                {
                    this.props.actions.map((action) => (
                        <div key={action.label} className={`overflow-menu ${this.state.isOverflowMenuOpen ? 'open' : 'close'}`}>
                            <p className='item' onClick={() => this.clickItem(action.action, action.mail)}>
                                {action.label}
                            </p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Action;
