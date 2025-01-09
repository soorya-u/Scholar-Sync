// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useQuery } from "@apollo/client";

// import { getInitDataQuery } from "@/graphql/queries";
// import { useToast } from "@/hooks/use-toast";
// import { useUser } from "./use-user";
// import { CoreType, NexusType, UserType } from "@/types/api";
// import { useApiData } from "./use-api-data";
// import { useCore } from "./use-core";
// import { useNexus } from "./use-nexus";

// export const useInitData = () => {
//   const { data, error, refetch, loading } = useQuery(getInitDataQuery, {
//     fetchPolicy: "no-cache",
//   });
//   const router = useRouter();
//   const { toast } = useToast();

//   const { setUser } = useUser();
//   const { apiData, setApiData } = useApiData();
//   const { core: currentCore, setCore } = useCore();
//   const { nexus: currentNexus, setNexus } = useNexus();

//   useEffect(() => {
//     if (loading) return;
//     if (error || !data || !data.getUser || !data.getUserData) {
//       router.replace("/auth/sign-up");
//       toast({
//         title: "Authentication Required",
//         variant: "destructive",
//         description: "Please Login or Sign Up to Proceed",
//       });
//       return;
//     }
//     setUser(data.getUser as UserType);
//     setApiData(data.getUserData as CoreType[]);
//     if (apiData.length === 0) return;

//     if (currentCore.id === "") {
//       const selectedCores = data.getUserData.filter(
//         (c: CoreType) => c.nexus && c.nexus?.length > 0,
//       );

//       const { id, imageUrl, name, nexus } =
//         selectedCores.length > 0 ? selectedCores[0] : apiData[0];

//       setCore({
//         id,
//         imageUrl,
//         name,
//         nexus: nexus.map((n: NexusType) => ({ ...n, creator: n.creator.id })),
//       });
//       nexus.length > 0 && nexus[0] && setNexus(nexus[0]);
//     } else {
//       const chosenCore = data.getUserData.find(
//         (c: CoreType) => c.id === currentCore.id,
//       );

//       if (chosenCore) {
//         setCore(chosenCore);
//         const chosenNexus = chosenCore.nexus.find(
//           (n: NexusType) => currentNexus.id === n.id,
//         );

//         if (chosenNexus) {
//           chosenNexus && setNexus(chosenNexus);
//         } else if (currentNexus.id === "")
//           chosenCore.nexus.length > 0 &&
//             chosenCore.nexus[0] &&
//             setNexus(chosenCore.nexus[0]);
//       }
//     }
//   }, [data, error, loading]);

//   return {
//     refetch,
//     loading,
//   };
// };
