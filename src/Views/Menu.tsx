import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchOption from '../Components/Menu/SearchOption'
import { ImageContext } from '../Contexts/imageContext'
import { ImageContextType } from '../@types/image'
import AmountSlider from '../Components/Menu/AmountSlider'
import SplitGrid from '../Components/Layouts/SplitGrid'
import SplitGridSlim from '../Components/Layouts/SplitGridSlim'
import NavigationLink from '../Components/MenuNavigation/NavigationLink'

type Props = {
}

export default function Menu(props: Props) {
    const navigate = useNavigate()

    const imageContext = React.useContext(ImageContext) as ImageContextType

    return (
        <div className='menu-container'>
            <nav>
                <SplitGridSlim
                    descriptionElement={<h1>Similallery</h1>}
                    descriptionFilled={true}
                    imageElement={
                        <ul className='menu-nav-links'>
                            <NavigationLink isActive={true} title="options" onClick={() => { console.log("") }}></NavigationLink>
                            <NavigationLink isActive={false} title="how to" onClick={() => { console.log("") }}></NavigationLink>
                            <NavigationLink isActive={false} title="about" onClick={() => { console.log("") }}></NavigationLink>
                            <NavigationLink isActive={false} title="back" onClick={() => { navigate("/") }}></NavigationLink>
                        </ul>
                    }
                ></SplitGridSlim>
            </nav>
            <div className='halfgrid'>
                <p>The Similallery opens a new way to experience an art collection by grouping images based on visual similarities (which are explained below). The Image with a purple border is the base and each of the other images on the screen is similar to it in one way but different in many others. Click on the images to explore the full breadth of a gigantic art collection.</p>
            </div>

            <div className='search-option-container'>
                <SplitGridSlim
                    imageElement={<AmountSlider
                        name="img-amount"
                        labeltext=''
                        min={imageContext.AMOUNT_RANGE[0]}
                        max={imageContext.AMOUNT_RANGE[1]}
                        startVal={imageContext.imgAmount}
                        onChange={(newVal, thumb) => { imageContext.setImgAmount(newVal) }}
                    ></AmountSlider>}
                    descriptionElement={<label>Amount of Images</label>}
                    descriptionFilled={false}
                ></SplitGridSlim>
                {
                    imageContext.similarityCriterias.map((criteria, index) => (
                        <SplitGrid
                            titleElement={
                                <SearchOption
                                    checked={imageContext.similarityCriterias[index].active}
                                    labelText={criteria.title} name={criteria.internalName}
                                    onChange={(event) => { imageContext.toggleCriteria(criteria.id) }}></SearchOption>
                            }
                            imageElement={
                                <img src={process.env.PUBLIC_URL + criteria.explainerImgPath} alt={`Explainer for ${criteria.title}`}></img>
                            }
                            descriptionElement={<p>{imageContext.similarityCriterias[index].description}</p>}
                            titleFilled={false}
                        ></SplitGrid>
                    ))
                }
                <SplitGrid titleElement={<h3>How to use</h3>}
                    titleFilled={true}
                    imageElement={<p></p>}
                    descriptionElement={<p></p>}></SplitGrid>
                <SplitGrid
                    titleElement={<h3>About</h3>}
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