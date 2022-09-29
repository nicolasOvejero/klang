import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import manage from '../../assets/manage.png';
import Button from '../../components/button/button.component';
import './home.style.scss';

function Home() {
    const navigate = useNavigate();
    const myRef: any = useRef<HTMLSpanElement>();
    const dataText = [
        {
            text: 'les anniversaires',
            color: 'primary'
        },
        {
            text: 'les événements',
            color: 'secondary'
        },
        {
            text: 'les nouveaux arrivants',
            color: 'primary'
        }
    ];

    const typeWriter = (
        text: string,
        color: string,
        currentPosition: number,
        fnCallback: any
    ) => {
        const node = myRef.current;
        node.classList.add(color);

        if (currentPosition < text.length) {
            setTimeout(() => {
                node.innerHTML = text.substring(0, currentPosition + 1);
                typeWriter(text, color, currentPosition + 1, fnCallback);
            }, 230);
        } else {
            setTimeout(() => {
                fnCallback();
            }, 500);
        }
    }

    const revertTypeWriter = (text: string, currentPosition: number, fnCallback: any) => {
        const node = myRef.current;

        if (currentPosition > 0) {
            setTimeout(() => {
                node.innerHTML = text.substring(0, currentPosition - 1);
                revertTypeWriter(text, currentPosition - 1, fnCallback);
            }, 100);
        } else {
            node.innerHTML = '';
            node.classList.remove('primary');
            node.classList.remove('secondary');
            fnCallback();
        }
    }

    const StartTextAnimation = (i: number) => {
        if (!dataText[i]) {
            setTimeout(() => {
                StartTextAnimation(0);
            }, 100);
        }
        if (dataText[i] && i < dataText.length) {
            typeWriter(dataText[i].text, dataText[i].color, 0, () => {
                revertTypeWriter(dataText[i].text, dataText[i].text.length, () => {
                    StartTextAnimation(i + 1);
                });
            });
        }
    }

    const goTo = (path: string) => {
        navigate(path);
    }

    useLayoutEffect(() => {
        StartTextAnimation(0);
    });

    return (
        <article className='body home'>
            <section className='headline-section'>
                <h1 className='headline-text'>
                    Sur Klang retrouvez :<br />
                    <span
                        ref={myRef}
                        className='word'
                    >
                    </span>
                </h1>
                <img
                    src={manage}
                    alt='headline management'
                    className='headline-image'
                />
            </section>
            <section className='buttons'>
                <Button
                    label='Anniversaires'
                    type='button'
                    color='primary'
                    clickHandler={ () => goTo('birthdays') }
                ></Button>
                <Button
                    label='Événements'
                    type='button'
                    color='secondary'
                    clickHandler={ () => goTo('events') }
                ></Button>
                <Button
                    label='Nouveaux arrivants'
                    type='button'
                    color='primary'
                    clickHandler={ () => goTo('new-arrivals') }
                ></Button>
            </section>
        </article>
    );
}

export default Home;
