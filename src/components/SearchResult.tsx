import React from "react";
import {
    Box,
    Container,
    Link,
    styled,
} from "@material-ui/core";
import Label from "./Label";
import {makeStyles} from "@material-ui/core/styles";

export interface Item {
    vocabulary: string;
    description?: string;
}

export interface SearchItem {
    label: string;
    isWord: boolean;
    vocabularies: string[];
    items?: Item[];
}

export interface clickCallback {
    click: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        "&:hover": {
            cursor: "pointer"
        },
    },

}));

const SearchResult: React.FC<SearchItem & clickCallback> = (props) => {
    const SearchBox = styled(Box)(({theme}) => ({
        borderLeft: "solid",
        borderColor: props.isWord
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        paddingLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
    }));
    const classes = useStyles();
    return (
        <Container>
            <SearchBox>
                <Link
                    classes={classes}
                    color="textPrimary"
                    underline="always"
                    variant="h2"
                    onClick={props.click}
                >
                    {props.label}
                </Link>
                {props.vocabularies.map((item) => {
                    return <Label key={item} iri={item}/>;
                })}
            </SearchBox>
        </Container>
    );
};

export default SearchResult;
