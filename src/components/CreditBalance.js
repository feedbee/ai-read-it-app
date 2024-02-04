import React from 'react';
import { Badge, Popover, OverlayTrigger } from 'react-bootstrap';
import { userMode } from '../config';
import { useUser } from '../context/UserContext';
import { useCredits } from '../context/CreditsContext';

function formatNumber(num) {
  if (typeof num !== 'number') {
    return num;
  }

  if (num < 1000) {
    return num.toString(); // Return the number itself if less than 1000
  }

  const units = ["K", "M", "G", "T", "P", "E"];
  let unitIndex = -1;
  let formattedNumber = num;

  while (formattedNumber >= 1000 && unitIndex < units.length - 1) {
    formattedNumber /= 1000;
    unitIndex++;
  }

  // Round to 1 decimal place and remove .0 if present
  formattedNumber = formattedNumber.toFixed(1).replace(/\.0$/, '');
  
  return `${formattedNumber}${units[unitIndex]}`;
}

const CreditBalance = () => {
  const { user } = useUser();
  const { credits } = useCredits();
  const creditAmountFull = credits;
  const creditAmountShort = formatNumber(credits);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Characters Credit</Popover.Header>
      <Popover.Body>
        <p>
          Your characters credit amount is <strong>{creditAmountFull ? creditAmountFull : '–'}</strong> (shortened as {creditAmountShort ? creditAmountShort : '–'}).
        </p>
        <p>
          20K characters were credited to you after registration (the first sing-in).
          We currently do not support self-service recharge.
        </p>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {userMode !== 'disabled' && user && (
      <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={popover}>
        <Badge bg="secondary"><i className="bi bi-c-circle-fill"></i> {creditAmountShort}</Badge>
      </OverlayTrigger>
      )}
    </>
  );
};

export default CreditBalance;
