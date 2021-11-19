import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type PromiseExecutor<T = any> = {
  resolve?: (arg?: T) => void;
};

export type RootStackParamList = {
  List: {cid: number};
  Home: {};
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
