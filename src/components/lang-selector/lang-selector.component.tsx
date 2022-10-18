import { Component, createRef } from 'react';
import { withTranslation } from 'react-i18next';
import { ReactComponent as FR } from '../../assets/fr.svg';
import { ReactComponent as EN } from '../../assets/gb.svg';
import { i18n } from 'i18next';
import { LANG_ACTION_TYPES } from '../../store/lang/lang.types';
import { connect } from 'react-redux';
import './lang-selector.style.scss';

class LangSelector extends Component<any, { showMenu: boolean }> {
    currentLang = '';
    i18n: i18n;
    refDiv: any;

    constructor(props: any) {
        super(props);

        this.i18n = this.props.i18n;
        this.currentLang = this.i18n.language;
        this.refDiv = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            showMenu: false
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event: any) {
        if (this.state.showMenu && this.refDiv &&
            !this.refDiv.current.contains(event.target)) {
            this.setShowMenu(false);
        }
    }

    onLangClick = (lang: string) => {
        this.i18n.changeLanguage(lang);
        this.currentLang = this.i18n.language;
        this.props.dispatch({
            type: LANG_ACTION_TYPES.SET_LANG,
            payload: { lang }
        });
    }

    setShowMenu = (showMenu: boolean) => {
        this.setState({ showMenu });
    }

    render() {
        this.currentLang = this.i18n.language;

        return (
            <div
                ref={this.refDiv}
                className='languages'
            >
                <button
                    className='main-button language-button'
                        type='button'
                        onClick={() => this.setShowMenu(!this.state.showMenu)}
                >
                    {this.currentLang.toLocaleUpperCase()}
                    {
                        this.currentLang === 'fr' && <FR />
                    }
                    {
                        this.currentLang === 'en' && <EN />
                    }
                </button>
                <div className={`overflow ${this.state.showMenu ? 'visible' : ''}`}>
                    <button
                        className='language-button'
                        type='button'
                        onClick={() => this.onLangClick('fr')}
                    >
                        FR <FR />
                    </button>
                    <button
                        className='language-button'
                        type='button'
                        onClick={() => this.onLangClick('en')}
                    >
                        EN <EN />
                    </button>
                </div>
            </div>
        )
    }
}

export default connect()(withTranslation()(LangSelector));
