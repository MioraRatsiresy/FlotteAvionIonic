import AvionListe from "../modele/AvionListe";
import TableauData from "./TableauData";

const DetailAvion = ({detail,kilometrage}:{detail:AvionListe,kilometrage:AvionListe}) => {
    return (
        <>
        <TableauData listeavion={detail} />
        <br/>
        <TableauData listeavion={kilometrage}/>
        </>
    );
};
export default DetailAvion;
