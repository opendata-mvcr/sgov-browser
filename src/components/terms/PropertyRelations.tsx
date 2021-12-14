import React from "react";
import { Typography } from "@mui/material";
import {TermRelationsInterface} from "../../api/data/terms";


interface PropertyRelationsProps{
    relations: TermRelationsInterface[]
}
const PropertyRelations: React.FC<PropertyRelationsProps> = ({relations}) => {
   console.log(relations);
    return <Typography>Property relations načteny</Typography>;
};

export default PropertyRelations;