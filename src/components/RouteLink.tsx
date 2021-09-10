import React from "react";
import { Link, LinkProps } from "@material-ui/core";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

const RouteLink: React.FC<LinkProps & RouterLinkProps> = (props) => {
  return (
    <Link
      component={RouterLink}
      variant="h2"
      color="textPrimary"
      underline="always"
      {...props}
    >
      {props.children}
    </Link>
  );
};

export default RouteLink;
