import { IonButton, IonButtons, IonChip, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import axios from 'axios';
import { list, car, logOut, airplane } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import Avion from '../modele/Avion';
import Vehicule from '../modele/Avion';
import AvionListe from '../modele/AvionListe';
import DetailVehicule from './DetailAvion';
import TableauData from './TableauData';
import VehiculeExpiration from './AssuranceExpiration';


var idAvion = 0;
const ExploreContainer = () => {
  const [presentAlert] = useIonAlert();
  const [listeavion, setListeAvion] = useState<any>();
  const [assurancemois, setassurancemois] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [kilometrage, setKilometrage] = useState<any>();
  const [etatassurance, setetatassurance] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  //afficher login
  function loginalerte() {
    presentAlert({
      header: 'Log in',
      buttons: [
        {
          text: 'Login',
          handler: () => {
            traitementLogin();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }

      ],
      inputs: [
        {
          type: 'text',
          placeholder: 'Email',
          id: 'email'
        },
        {
          type: 'password',
          placeholder: 'Password',
          id: 'pwd'
        },
      ],
    })
  }
  //fonction utilisé pour afficher des alertes
  function afficherAlerte(texte: string) {
    presentAlert(
      {
        header: texte,
        buttons: [
          {
            text: 'OK',
            role: 'confirm',
          },

        ],
      }
    );
  }

  //login
  function login(id: any) {
    idAvion = id;
    loginalerte();
  }
  //voir liste des vehicule via axios
  function voirliste() {
    //https://vehiculespring-production.up.railway.app/
    //http://localhost:6942/
    axios.get("http://localhost:6942/MadaSky/avions/liste").then((response) => {
      listeAvion(response.data);
    })
  }
  function listeAvion(info: any) {
    var avoir = ['nom', 'photo'];
    var liste = new AvionListe();
    liste.donnee = info["data"];
    liste.donnetitre = avoir;
    liste.fonction = afficherDetail;
    liste.fonctionpardefaut = login;
    liste.place = 0;
    liste.titre = null;
    liste.infinitefunction = generateItems;
    setListeAvion(liste);
    setassurancemois(null);
    setetatassurance(1);

  }

  //afficher detail via axios
  function afficherDetail(id: any) {
    axios.get("http://localhost:6942/MadaSky/avions/" + id + "/detail/" + sessionStorage.getItem('TokenUtilisateur')).then((response) => {
      if (response.data["erreur"] == null) {
        AvionInformation(response.data);
      }
      else {
        sessionStorage.clear();
        afficherAlerte("Token Invalid");
      }
    })
  }
  function AvionInformation(detail: any) {
    setIsOpen(true);
    //detail
    var title_detail = ['Photo', 'Nom', 'Constructeur', 'Longueur', 'Hauteur'];
    var title_donnee = ['photo', 'nom', 'constructeur', 'longueur', 'hauteur'];


    //kilometrage
    var title_kilometrage = ['Date de décollage','Date Atterissage', 'Km début', 'Km fin'];
    var tete_kilometrage = ['datedecollage','dateatterissage', 'kmdebut', 'kmfin'];


    var liste = new AvionListe();
    liste.donnee = detail["data"];
    liste.donnetitre = title_donnee;
    liste.fonction = null;
    liste.fonctionpardefaut = null;
    liste.place = null;
    liste.titre = title_detail;
    setDetail(liste);
    var kilometrage = new AvionListe();
    kilometrage.donnee = detail["data"][0]["kilometrage"];
    kilometrage.donnetitre = tete_kilometrage;
    kilometrage.fonction = null;
    kilometrage.fonctionpardefaut = null;
    kilometrage.place = null;
    kilometrage.titre = title_kilometrage;
    setKilometrage(kilometrage);

  }

  /***********************************************************************************************/


  //traitement login via axios
  function traitementLogin() {
    var emaildocument = document.getElementById('email');
    var pwddocument = document.getElementById('pwd');
    let pwd = "";
    let email = "";
    if (emaildocument != null && pwddocument != null) {
      pwd = (pwddocument as HTMLInputElement).value;
      email = (emaildocument as HTMLInputElement).value;
    }
    // signInWithEmailAndPassword(email,pwd);
    axios.post("http://localhost:6942/MadaSky/login/traitement?email=" + email + "&pwd=" + pwd).then((response) => {
      if (response.data['message'] === "Login correcte") {
        sessionStorage.setItem("TokenUtilisateur", response.data['token']);
        if (idAvion != 0) {
          afficherDetail(idAvion);
        }
        else {
          assurance3mois();
        }
      }
      else {
        afficherAlerte("Mot de passe ou utilisateur invalide!!!!Veuillez reessayer");
      }
    })
  }

  //assurance 3 mois
  function assurance3mois() {
    if (sessionStorage.getItem('TokenUtilisateur') == null) {
      loginalerte();
    }
    else {
      axios.get("http://localhost:6942/MadaSky/avions/3/assurance/expiration/" + sessionStorage.getItem('TokenUtilisateur')).then((response) => {
        var vc = Array();
        for (var item = 0; item < response.data["data"].length; item++) {
          vc[item] = new Avion();
          vc[item].nom = response.data["data"][item]["nom"];
          vc[item].longueur = response.data["data"][item]["longueur"];
          vc[item].dateAssurance = response.data["data"][item]["dateAssurance"];
          vc[item].dateExpiration = response.data["data"][item]["dateExpiration"];
          vc[item].id = response.data["data"][item]["id"];
          vc[item].constructeur = response.data["data"][item]["constructeur"];
        }
        setassurancemois(vc);
        setListeAvion(undefined);
      });
    }
  }
  //assurance 1 mois
  function assurance1mois() {
    if (sessionStorage.getItem('TokenUtilisateur') == null) {
      loginalerte();
    }
    else {
      axios.get("http://localhost:6942/MadaSky/avions/1/assurance/expiration/" + sessionStorage.getItem('TokenUtilisateur')).then((response) => {
        var vc = Array();
        for (var item = 0; item < response.data["data"].length; item++) {
          vc[item] = new Vehicule();
          vc[item].categorie = response.data["data"][item]["categorie"];
          vc[item].modele = response.data["data"][item]["modele"];
          vc[item].dateAssurance = response.data["data"][item]["dateAssurance"];
          vc[item].dateExpiration = response.data["data"][item]["dateExpiration"];
          vc[item].id = response.data["data"][item]["id"];
          vc[item].immatriculation = response.data["data"][item]["immatriculation"];
        }
        setassurancemois(vc);
        setListeAvion(undefined);
      });
    }
  }
  function expiration(id: any) {
    if (id == 1) {
      assurance1mois();
    }
    else {
      assurance3mois();
    }
  }
  //deconnexion
  function logout() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var retour = JSON.parse(this.responseText);
        if (retour['message'] === "Logout with success") {
          sessionStorage.clear();
          voirliste();
        }
        else {
        }
      }
    }
    xmlhttp.open("GET", "http://localhost:6942/MadaSky/user/logout");
    xmlhttp.send();
  }
  function closeModal() {
    setIsOpen(false);
  }
  function showAssurance() {
    setetatassurance(2);
    setListeAvion(undefined);
    setKilometrage(undefined);
    setDetail(undefined);
  }
  function searchavion(inputvalue: any) {
    if (inputvalue.length == 0) {
      inputvalue = "nothing";
    }
    axios.get("http://localhost:6942/Avions/search/" + inputvalue).then((response) => {
      listeAvion(response.data);
    });
  }
  const [items, setItems] = useState(null);
  const generateItems = () => {
    voirliste();
    // const newItems = [];
    // for (let i = 0; i < 50; i++) {
    //   newItems.push(`Item ${1 + listeavion.length + i}`);
    // }
    // setItems([...items, ...newItems]);
  };

  useEffect(() => {
    generateItems();
    // eslint-disable-next-line
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mada Sky <IonIcon icon={airplane}></IonIcon></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mada Sky <IonIcon icon={airplane}></IonIcon></IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <div className='row'>
            <div className='col-md-3'>
              {etatassurance == 2 ?
                <IonList>
                  <IonItem>
                    <IonSelect placeholder="Expiration Assurance" onIonChange={(e) => expiration(e.detail.value)}>
                      <IonSelectOption value="1">1 mois</IonSelectOption>
                      <IonSelectOption value="2">3 mois</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
                :
                ''
              }
            </div>
          </div>
          <hr></hr>
          <div className='row'>
            <div id="vehicule" className='col-md-3'>
              {listeavion == undefined
                ? ''
                : <div className='liste-vehicule'>
                  <IonInput placeholder='Search here' onIonInput={(e) => searchavion(e.target.value)}></IonInput>
                  <TableauData listeavion={listeavion} />
                </div>
              }
              {
                assurancemois != undefined ?
                  <VehiculeExpiration avion={assurancemois} fonction={afficherDetail}></VehiculeExpiration>
                  : ''
              }
            </div>
            <div id="detail" className='col-md-8'>
            </div>
          </div>
        </div >
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detail</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeModal}>
                  <IonChip>
                    <IonLabel>X</IonLabel>
                  </IonChip>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div className='detailVehicule'>
              {
                detail == undefined
                  ? ''
                  :
                    <DetailVehicule detail={detail} kilometrage={kilometrage} />
              }
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonSegment scrollable={true} value="heart">
          <IonSegmentButton value="liste" onClick={voirliste}>
            <IonIcon icon={list} ></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="assurance" onClick={showAssurance}>
            <IonIcon icon={car}>
            </IonIcon>
          </IonSegmentButton>
          {sessionStorage.getItem("TokenUtilisateur") != null ?
            <IonSegmentButton value="logout" onClick={logout}>
              <IonIcon icon={logOut} ></IonIcon>
            </IonSegmentButton>
            :
            ''
          }
        </IonSegment>
      </IonFooter>
    </IonPage>
  );
};

export default ExploreContainer;
