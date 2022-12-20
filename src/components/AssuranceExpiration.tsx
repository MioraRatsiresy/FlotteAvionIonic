import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel, IonRouterLink } from "@ionic/react";
import './AssuranceExpiration.css';

const VehiculeExpiration = ({ avion, fonction }: { avion: any, fonction: any }) => {
    return (
        <div className="expiration">
            {avion.map((value1: string, j: number) => {
                return (
                    <div className="panel panel-info" key={j}>
                        <IonCard color="light">
                            <IonCardHeader>
                                <IonCardTitle><IonRouterLink onClick={fonction.bind(this, avion[j].id)}> {avion[j].immatriculation + " " + avion[j].categorie + " " + avion[j].modele}
                                </IonRouterLink></IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent >
                                <div className='panel-body'><b>Date de paiement de l'assurance : </b><IonLabel>{avion[j].dateAssurance}</IonLabel>
                                </div>
                                <div className='panel-body'><b>Date d'expiration de l'assurance :</b>
                                    <IonLabel>{avion[j].dateExpiration}</IonLabel>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </div>
                );
            })}
        </div>
    );
};

export default VehiculeExpiration;
