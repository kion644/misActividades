import React from 'react';

export const useOpenCloseMenu = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
   
        setAnchorEl(null);
   

    };

    return {
        open,
        anchorEl,
        handleClick,
        handleClose
    }
}

