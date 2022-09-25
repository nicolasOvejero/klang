import { Fragment, useLayoutEffect, useRef } from 'react';
import Navigation from '../navigation/navigation.component';
import manage from '../../assets/manage.png';
import './home.style.scss';

function Home() {
    const myRef: any = useRef<HTMLSpanElement>();
    const dataText = [
        "les anniversaires",
        "les événements"
    ];

    const typeWriter = (text: string, currentPosition: number, fnCallback: any) => {
        const node = myRef.current;

        if (currentPosition < text.length) {
            setTimeout(() => {
                node.innerHTML = text.substring(0, currentPosition + 1);
                typeWriter(text, currentPosition + 1, fnCallback);
            }, 130);
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
            }, 150);
        } else {
            node.innerHTML = '';
            fnCallback();
        }
    }

    const StartTextAnimation = (i: number) => {
        if (!dataText[i]){
            setTimeout(() => {
                StartTextAnimation(0);
            }, 200);
        }
        if (dataText[i] && i < dataText[i].length) {
            typeWriter(dataText[i], 0, () => {
                revertTypeWriter(dataText[i], dataText[i].length, () => {
                    StartTextAnimation(i + 1);
                });
            });
        }
    }

    useLayoutEffect(() => {
        StartTextAnimation(0);
    });

    return (
        <Fragment>
            <article className='body'>
                <section className='headline-section'>
                    <h1 className='headline-text'>
                        Sur Klang retrouver :<br />
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
            </article>
{/*             <article>
                <Birthday />
            </article>
*/}        </Fragment>
    );
}

export default Home;
