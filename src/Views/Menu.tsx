import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchOption from '../Components/Menu/SearchOption'
import { SettingsContext } from '../Contexts/SettingsContext'
import { SettingsContextType } from '../@types/image'
import AmountSlider from '../Components/Menu/AmountSlider'
import SplitGrid from '../Components/Layouts/SplitGrid'
import SplitGridSlim from '../Components/Layouts/SplitGridSlim'
import NavigationLink from '../Components/MenuNavigation/NavigationLink'
import { RefObject } from 'react'

type Props = {
}

export default function Menu(props: Props) {
    const navigate = useNavigate()

    const optionsRef = useRef<HTMLHeadingElement>(null);
    const howToRef = useRef<HTMLHeadingElement>(null);
    const aboutRef = useRef<HTMLHeadingElement>(null);

    function scrollToRef(ref: RefObject<Element>) {
        if (ref.current !== null) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    const settingsContext = React.useContext(SettingsContext) as SettingsContextType

    return (
        <div className='menu-container'>
            <nav>
                <SplitGridSlim
                    descriptionElement={<h1>Similallery</h1>}
                    descriptionFilled={true}
                    imageElement={
                        <ul className='menu-nav-links'>
                            <NavigationLink isActive={false} title="options" onClick={() => { scrollToRef(optionsRef) }}></NavigationLink>
                            <NavigationLink isActive={false} title="how to" onClick={() => { scrollToRef(howToRef) }}></NavigationLink>
                            <NavigationLink isActive={false} title="about" onClick={() => { scrollToRef(aboutRef) }}></NavigationLink>
                            <NavigationLink isActive={false} title="back" onClick={() => { navigate("/") }}></NavigationLink>
                        </ul>
                    }
                ></SplitGridSlim>
            </nav>
            <div className='halfgrid'>
                <p>The Similallery opens a new way to experience an art collection by grouping images based on visual similarities (which are explained below). The Image with a purple border is the base and each of the other images on the screen is similar to it in one way but different in many others. Click on the images to explore the full breadth of a gigantic art collection.</p>
            </div>

            <div className='search-option-container' ref={optionsRef}>
                <SplitGridSlim
                    imageElement={<AmountSlider
                        name="img-amount"
                        labeltext=''
                        min={settingsContext.AMOUNT_RANGE[0]}
                        max={settingsContext.AMOUNT_RANGE[1]}
                        startVal={settingsContext.imgAmount}
                        onChange={(newVal, thumb) => { settingsContext.setImgAmount(newVal) }}
                    ></AmountSlider>}
                    descriptionElement={<label>Amount of Images</label>}
                    descriptionFilled={false}
                ></SplitGridSlim>
                {
                    settingsContext.similarityCriterias.map((criteria, index) => (
                        <SplitGrid
                            titleElement={
                                <SearchOption
                                    checked={settingsContext.similarityCriterias[index].active}
                                    labelText={criteria.title} name={criteria.internalName}
                                    onChange={(event) => { settingsContext.toggleCriteria(criteria.id) }}></SearchOption>
                            }
                            imageElement={
                                <img src={process.env.PUBLIC_URL + criteria.explainerImgPath} alt={`Explainer for ${criteria.title}`}></img>
                            }
                            descriptionElement={<p>{settingsContext.similarityCriterias[index].description}</p>}
                            titleFilled={false}
                        ></SplitGrid>
                    ))
                }
                <SplitGrid titleElement={<h3 ref={howToRef}>How to use</h3>}
                    titleFilled={true}
                    imageElement={<p></p>}
                    descriptionElement={<p></p>}
                ></SplitGrid>
                <SplitGrid
                    titleElement={<h3 ref={aboutRef}>About</h3>}
                    titleFilled={true}
                    imageElement={<p>This Website and the backend it uses were developed by Simon Gisler for his Bachelor Thesis for Digital Ideation at the University of Applied Sciences Lucerne.
                        All the images displayed have been released online by the museums that own them and are free to use. You can find all of them in higher resolution and with more information on ArtVee.com
                        If you have any questions about how it works or if you want to use the code contact me!</p>}
                    descriptionElement={<p>simongisler.ch</p>}
                ></SplitGrid>
            </div>
        </div>
    )
}