import React from "react";
import {Typography} from "@mui/material";
import {TermRelationsInterface} from "../../api/data/terms";

interface TermRelationsProps{
    relations: TermRelationsInterface[]
}
const TermRelations: React.FC<TermRelationsProps> = ({relations}) => {
    console.log(relations)
    return <Typography>Term relations načteny</Typography>;
};

export default TermRelations;