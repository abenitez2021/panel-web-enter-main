import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TypographyBold = ({ variant, component, children, color, style, className }) => (
    <Typography variant={variant} component={component} color={color} style={style} className={className}>
        <Box fontWeight="fontWeightBold">{children}</Box>
    </Typography>
)

export default TypographyBold;