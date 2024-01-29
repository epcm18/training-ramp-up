import React from "react";
import DataTable from "./DataTable/DataTable";
import { Button, Typography, Box } from "@mui/material";
import styled from "styled-components";
import "@fontsource/roboto";

const StyledHeaderBox = styled(Box)`
  &&& {
    width: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: flex-start;
    padding: 8px 24px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLoginButton = styled(Button)`
  &&& {
    border-color: #2196f380;
    color: #2196f3;
    font-family: Roboto;
    font-weight: 500;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: 0.46px;
  }
`;

const StyledTypography = styled(Typography)`
  &&& {
    width: 181px;
    height: 32px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0px;
    text-align: left;
    color: #1e88e5;
  }
`;

const StyledDataBox = styled(Box)`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 80px;
    margin-bottom: 50px;
  }
`;

const StyledMainDiv = styled.div`
  &&& {
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
  }
`;

function AdminPage() {
  return (
    <StyledMainDiv>
      <StyledHeaderBox>
        <StyledTypography variant="h5">Ramp Up Project</StyledTypography>
        <StyledLoginButton variant="outlined">LOGIN</StyledLoginButton>
      </StyledHeaderBox>
      <StyledDataBox>
        <DataTable />
      </StyledDataBox>
    </StyledMainDiv>
  );
}

export default AdminPage;
