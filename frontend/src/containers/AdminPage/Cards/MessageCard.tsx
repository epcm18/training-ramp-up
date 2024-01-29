import React from "react";
//import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import styled from "@mui/system/styled";

const StyledDialogBox = styled(Box)`
  &&& {
    width: 444px;
    height: 110px;
    border-radius: 12px;
    box-shadow: 0px 11px 15px -7px #00000033, 0px 24px 38px 3px #00000024,
      0px 9px 46px 8px #0000001f;
  }
`;

const StyledTypographyBox = styled(Typography)`
  &&& {
    width: 396px;
    height: 26px;
    padding: 16px 24px;
  }
`;

const StyledTypography = styled(Typography)`
  &&& {
    font-family: Roboto;
    font-weight: 400;
    font-size: 16px;
    line-height: 25.6px;
    letter-spacing: 0.15px;
  }
`;

const StyledPrimaryButton = styled(Button)<{ color: string }>`
  &&& {
    width: auto;
    height: 24px;
    padding: 6px 8px;
    border-radius: 4px;
    color: ${(props) => (props.color === "secondary" ? "#2196f3" : "#9c27b0")};
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
    gap: 8px;
  }
`;

const StyledSecondaryButton = styled(Button)`
  &&& {
    width: auto;
    height: 24px;
    padding: 6px 8px;
    border-radius: 4px;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.4px;
  }
`;

const StyledButtonBox = styled(Box)`
  &&& {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    gap: 8px;
  }
`;

interface IButtonConfig {
  text: string;
  onClick: () => void;
}

interface IMessageCardProps {
  message: string;
  primaryButton: IButtonConfig;
  secondaryButton?: IButtonConfig;
  primaryOption: string;
  secondaryOption?: string;
}

const MessageCard: React.FC<IMessageCardProps> = ({
  message,
  primaryButton,
  secondaryButton = { text: "", onClick: () => {} }, // Default values
  primaryOption,
  secondaryOption = "",
}) => {
  const isSingleButton = !secondaryButton.text; // Check if secondary button is not provided

  return (
    <StyledDialogBox>
      <StyledTypographyBox>
        <StyledTypography>{message}</StyledTypography>
      </StyledTypographyBox>
      <StyledButtonBox>
        <StyledPrimaryButton
          variant="text"
          onClick={primaryButton.onClick}
          color={isSingleButton ? "secondary" : "primary"}
        >
          {primaryButton.text}
        </StyledPrimaryButton>
        {!isSingleButton && (
          <StyledSecondaryButton
            variant="text"
            onClick={secondaryButton.onClick}
          >
            {secondaryButton.text}
          </StyledSecondaryButton>
        )}
      </StyledButtonBox>
    </StyledDialogBox>
  );
};

export default MessageCard;
