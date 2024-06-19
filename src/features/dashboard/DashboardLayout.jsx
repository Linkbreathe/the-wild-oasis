import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import {useRecentBookings} from "./useRecentBookings"
import {useRecentStay} from "./useRecentStay"
import Stats from './Stats'
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const {isloading:isBookingLoading,bookings} = useRecentBookings()
  const {isloading:isStayLoading, stays, confirmedStays, numDays } = useRecentStay()
  console.log(confirmedStays)
  const {cabins,isLoading:isloadingCabin} = useCabins()
  if(isBookingLoading || isStayLoading || isloadingCabin) return <Spinner/>
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}/>
      {/* <div>Today's activies</div>
      <div>chart duration</div> */}
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
