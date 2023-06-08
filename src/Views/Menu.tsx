import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchOption from '../Components/Menu/SearchOption'
import { SettingsContext } from '../Contexts/SettingsContext'
import { SettingsContextType } from '../@types/image'
import AmountSlider from '../Components/Controls/AmountSlider'
import SplitGrid from '../Components/Layouts/SplitGrid'
import SplitGridSlim from '../Components/Layouts/SplitGridSlim'
import NavigationLink from '../Components/Controls/NavigationLink'


type Props = {
}

export default function Menu(props: Props) {

    const settingsContext = React.useContext(SettingsContext) as SettingsContextType

    return (
        <div className='menu-container'>
            <nav>
                <SplitGridSlim
                    descriptionElement={<h1>Similallery</h1>}
                    descriptionFilled={true}
                    imageElement={
                        <div className='menu-nav-links'>
                            <NavigationLink isActive={false} title="close" route="/"></NavigationLink>
                        </div>
                    }
                ></SplitGridSlim>
            </nav>
            <div className='halfgrid' id="description">
                <p>The Similallery opens a new way to experience an art collection by grouping images based on visual similarities (which are explained below). The Image with a purple border is the base and each of the other images on the screen is similar to it in one way but different in many others. Click on the images to explore the full breadth of a gigantic art collection.</p>
            </div>

            <div className='search-option-container'>
                <SplitGridSlim
                    key={Math.random()}
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
                            key={Math.random()}
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
                <SplitGrid
                    key={Math.random()}
                    titleElement={<h3>How to use</h3>}
                    titleFilled={true}
                    imageElement={<img src={process.env.PUBLIC_URL + "/images/Explainers/Help.png"} alt='Visual Help showing all the buttons'></img>}
                    descriptionElement={<ol>
                        <li>Click on any of the images to make it the main image,and load new, similar images</li>
                        <li>The Image with a purple border is the main image, the one all are similar to</li>
                        <li>Click for a more detailed view of the image</li>
                        <li>Go to the Help Page</li>
                        <li>Get collection of similar images based on a random main image</li>
                        <li>Toggle the similarity criteria</li>
                    </ol>}
                ></SplitGrid>
                <SplitGrid
                    key={Math.random()}
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