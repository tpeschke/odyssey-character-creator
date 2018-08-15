import React from 'react'
import WeaponReview from './WeaponReview'

export default function DisplayChar(props) {
    let { species, scores, background, qf, talents, profics, special, credits, hp } = props

    return (
        <div>
            <div className="reviewLower">

                <div className="reviewLowerLeft">
                    <h2 className='reviewTitle'>Stats</h2>
                    <div className="scoreUnderscore" />
                    {scores ? scores.map(val => {
                        return (
                            <div key={val.id} className="reviewStats">
                                <p className="scoreScore">{val.title.toUpperCase()}</p>
                                <p className="scoreScore">{val.score}</p>
                            </div>
                        )
                    }) : <div></div>}

                </div>

                <div className="reviewLowerRight">
                    <div className='reviewNameShell'>
                        <div className='reviewNameBox'>
                            <p className='reviewNameTitle'>Species</p>
                            <div className="scoreUnderscore" />
                            <p>{species.species}</p>
                        </div>

                        <div className='reviewNameBox'>
                            <p className='reviewNameTitle'>Background</p>
                            <div className="scoreUnderscore" />
                            <p>{background.name}</p>
                        </div>

                        <div className='reviewNameBox'>
                            <p className='reviewNameTitle'>{species.species === "Akehlarian" ? 'Spores' : 'HP'}</p>
                            <div className="scoreUnderscore" />
                            <p>{hp}</p>
                        </div>
                    </div>

                    <p className='reviewNameTitle reviewQF'>Quirks & Flaws</p>
                    <div className="scoreUnderscore" />
                    <div className="reviewQFList">
                        {qf ? qf.map((v, i) => {
                            return (<div key={v.id}
                                className="reviewQFitem">
                                <p className="">{v.name}</p>
                            </div>
                            )
                        }) : <div></div>}
                    </div>
                </div>

            </div>

            <div className="reviewSTPshell">
                <div className="reviewSTPbox">
                    <h2>Skills</h2>
                    <div className="scoreUnderscore" />
                </div>

                <div className="reviewSTPbox">
                    <h2>Talents</h2>
                    <div className="scoreUnderscore" />
                    {talents ? talents.map((talent, i) => {
                        return (<div key={talent.id + i}
                            className='reviewSTPitem'>
                            <p>{talent.name}</p>
                        </div>
                        )
                    }) : <div></div>}
                </div>

                <div className="reviewSTPbox">
                    <h2>Proficiencies</h2>
                    <div className="scoreUnderscore" />
                    {profics ? profics.map((profic, i) => {
                        return (<div key={profic.id + i}
                            className='reviewSTPitem'>
                            <p>{profic.name}</p>
                        </div>
                        )
                    }) : <div></div>}
                </div>
            </div>

            <div className="reviewSpecialShell">
                <h2 className='reviewTitle'>Specializations</h2>
                <div className="scoreUnderscore" />
                <div className="reviewSTPitem reviewSpecial">
                    {special ? special.map(val => <WeaponReview key={val.id} val={val} />) : <div></div>}
                </div>
            </div>

            <div className="reviewSpecialShell">
                <h2 className='reviewTitle'>Goods & Equipment</h2>
                <div className="scoreUnderscore" />

                <div className="reviewGoodsCredit">
                    {Math.floor(credits / 4000) === 0 ?
                        <div></div> :
                        <div className="reviewGoodsCreditBox">
                            <p>Scrap</p>
                            <p>{Math.floor(credits / 20000)}</p>
                        </div>}
                    <div className="reviewGoodsCreditBox">
                        <p>Credits</p>
                        <p>{credits % 4000}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}