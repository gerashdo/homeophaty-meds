import { InnerMedsInput } from "./InnerMedsInput"
import { MedSmallCard } from "./MedSmallCard"


export const InnerMedsForm = ({ innerMeds, onRemoveInnerMeds, onChangeInnerMeds, label = '' }) => {

    const handleOnChangeInnerMeds = ( medicine ) => {
        onChangeInnerMeds( medicine )
    }

    return (
        <>
            {
                innerMeds.length > 0 
                ? (
                    <div>
                        <ul>
                            {
                                innerMeds.map( med => (
                                    <MedSmallCard 
                                        key={ med.id } 
                                        medicamento={ med }
                                        onCloseInnerMed={ onRemoveInnerMeds }
                                        isDelete={ true }
                                    />
                                ))
                            }
                        </ul>
                    </div>
                )
                : null
            }

            <div>
                {
                    label.length > 0
                    ? ( <label htmlFor="inner_meds">{ label }</label> )
                    : null
                }
                <InnerMedsInput 
                    id="inner_meds"
                    onChangeInnerMeds={ handleOnChangeInnerMeds }
                    innerMeds={ innerMeds }
                />
            </div>
        </>

    )
}