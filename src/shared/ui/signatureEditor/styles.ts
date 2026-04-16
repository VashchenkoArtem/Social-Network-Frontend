import { StyleSheet } from "react-native";
import { COLORS } from "@shared/constants/colors";


export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 10,
  },
  canvasWrapper: {
    height: 200,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.lightestGray,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.foggy,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 15,
  },
  miniBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  btnClear: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightestGray,
  },
  btnConfirm: {
    backgroundColor: COLORS.plum,
  },
  textClear: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '700',
  },
  textConfirm: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
  },
});