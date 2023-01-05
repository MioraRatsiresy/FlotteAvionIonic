import { IonButton, IonButtons, IonChip, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonRouterLink, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { camera } from "ionicons/icons";
import AvionListe from "../modele/AvionListe";
import { usePhotoGallery } from "./Photo";

const TableauData = ({ listeavion }: { listeavion: AvionListe }) => {
    const { photos, takePhoto } = usePhotoGallery();
    const css = `
        .img{
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-top:-80px;
            margin-left : 5px;
        }
        .card-title {
            font-weight : bold;
        }
        `
    return (
        <>
            <style>
                {css}
            </style>



            <div>
                {listeavion.titre != null ?
                    <div className="card">
                        {listeavion.titre.map((value: string, id: number) => {
                            return (
                                listeavion.donnee.map((value1: string, i: number) => {
                                    return (
                                        <div className="row g-0" key={i}>
                                            {listeavion.donnetitre[id] == 'photo' ?

                                                <IonImg src={"data:image/jpeg;base64,"+listeavion.donnee[i]['photo']} alt=""></IonImg>
                                                :
                                                <IonLabel><strong className="card-title">{value}</strong><span> : {listeavion.donnee[i][listeavion.donnetitre[id]]}</span></IonLabel>

                                            }
                                        </div>
                                    )
                                })
                            );
                        })}

                    </div>
                    : ''
                }
            </div>
            {
                    listeavion.etat == 1 ?
                        <IonFab vertical="bottom" horizontal="end">
                            <IonFabButton  onClick={() => takePhoto(listeavion.donnee[0]["id"])}>
                                <IonIcon icon={camera}></IonIcon>
                            </IonFabButton>
                        </IonFab>
                        :
                        ''
                }
            <div>
                {listeavion.fonction != null ?
                    <div>
                        {listeavion.donnee.map((value1: string, j: number) => {
                            return (<div className="card mb-3" key={j}>
                                <div>
                                    {listeavion.donnetitre.map((value1: string, k: number) => {
                                        return (<div key={k}>
                                            {sessionStorage.getItem('TokenUtilisateur') == null ?
                                                listeavion.donnetitre[k] == 'photo' ?
                                                    <span className="row g-0">
                                                        <div className="col-4">
                                                            <IonImg src={"data:image/jpeg;base64,"+listeavion.donnee[j]['photo']} className="img" alt=""></IonImg>
                                                        </div>
                                                        <div className="col-8">

                                                        </div>
                                                    </span>
                                                    : <span className="row g-0">
                                                        <div className="col-4">

                                                        </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title"><IonRouterLink onClick={listeavion.fonctionpardefaut.bind(this, listeavion.donnee[j]["id"])} >{listeavion.donnee[j][listeavion.donnetitre[k]]}</IonRouterLink></h5>
                                                            </div>
                                                        </div>
                                                    </span>

                                                :
                                                listeavion.donnetitre[k] == 'photo' ?
                                                    <span className="row g-0">
                                                        <div className="col-4">
                                                            <IonImg src={"data:image/jpeg;base64,"+listeavion.donnee[j]['photo']} className="img" alt=""></IonImg>
                                                        </div>
                                                        <div className="col-8">

                                                        </div>
                                                    </span>
                                                    : <><span className="row g-0">
                                                        <div className="col-4">

                                                        </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <h5 className="card-title"><IonRouterLink onClick={listeavion.fonction.bind(this, listeavion.donnee[j]["id"])} >{listeavion.donnee[j][listeavion.donnetitre[k]]}</IonRouterLink></h5>
                                                            </div>
                                                        </div>
                                                    </span>
                                                    </>
                                            }
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    : ''
                }
            </div>
            {
                listeavion.infinitefunction != null ?
                    <IonInfiniteScroll
                        onIonInfinite={(ev) => {
                            listeavion.infinitefunction;
                            setTimeout(() => ev.target.complete(), 500);
                        }}
                    >
                        <IonInfiniteScrollContent></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                    : ''
            }


        </>
    );
};
export default TableauData;
