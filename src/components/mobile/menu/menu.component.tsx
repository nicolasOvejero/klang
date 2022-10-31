import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { ReactComponent as FR } from '../../../assets/fr.svg';
import { ReactComponent as EN } from '../../../assets/gb.svg';
import { useDispatch } from 'react-redux';
import { LANG_ACTION_TYPES } from '../../../store/lang/lang.types';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import './menu.style.scss';

type MobileMenuProps = {
    isOpen: boolean;
    isAdmin: boolean;
    closeMenu: () => void;
    signOut: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = (props: MobileMenuProps) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const onLangClick = (lang: string) => {
        i18n.changeLanguage(lang);
        dispatch({
            type: LANG_ACTION_TYPES.SET_LANG,
            payload: { lang }
        });
    }

    return (
        <div className={ `mobile-menu ${props.isOpen ? 'open' : ''}` }>
            <Close
                className='close'
                onClick={props.closeMenu}
            />
            <div className='logo-container'>
                <img
                    className='logo'
                    alt="logo"
                    src={logo}
                />
            </div>
            <Link
                className='item primary'
                to='birthdays'
                onClick={props.closeMenu}
            >
                {t('mobile.birthdays')}
            </Link>
            <hr className='separator light' />
            <Link
                className='item secondary'
                to='events'
                onClick={props.closeMenu}
            >
                {t('mobile.events')}
            </Link>
            <hr className='separator light' />
            <Link
                className='item primary'
                to='new-arrivals'
                onClick={props.closeMenu}
            >
                {t('mobile.new-arrivals')}
            </Link>
            <hr className='separator' />
            <Link
                className='item'
                to='profile'
                onClick={props.closeMenu}
            >
                {t('mobile.profile')}
            </Link>
            {
                props.isAdmin && (
                    <Fragment>
                        <hr className='separator light' />
                        <Link
                            className='item'
                            to='admin'
                            onClick={props.closeMenu}
                        >
                            {t('mobile.administration')}
                        </Link>
                    </Fragment>
                )
            }
            <hr className='separator light' />
            <Link
                className='item'
                to='login'
                onClick={props.signOut}
            >
                {t('mobile.logout')}
            </Link>
            <hr className='separator' />
            <p className='item'>
                {t('mobile.lang')} {i18n.language?.toLocaleUpperCase()}
                {
                    i18n.language === 'fr' && <FR />
                }
                {
                    i18n.language === 'en' && <EN />
                }
            </p>
            <hr className='separator light' />
            <div className='button-container'>
                    <button
                        className='language-button'
                        type='button'
                        onClick={() => onLangClick('fr')}
                    >
                        FR <FR />
                    </button>
                    <button
                        className='language-button'
                        type='button'
                        onClick={() => onLangClick('en')}
                    >
                        EN <EN />
                    </button>
            </div>
        </div>
    );
}

export default MobileMenu;
