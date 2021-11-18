import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {VISIBILITY_FILTERS} from '../../../constants';
import {RootState} from '../../../store';
import {selectVisibilityFilter, setFilter} from '../todoAppSlice';

interface VisibilityFiltersProps extends PropsFromRedux {}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  filterActive: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

const VisibilityFilters = ({
  activeFilter,
  setFilter,
}: VisibilityFiltersProps) => {
  return (
    <View style={styles.container}>
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <TouchableOpacity
            key={`visibility-filter-${currentFilter}`}
            style={[
              styles.item,
              currentFilter === activeFilter && styles.filterActive,
            ]}
            onPress={() => {
              setFilter({
                filter: currentFilter,
              });
            }}>
            <Text>{currentFilter}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const mapState = (store: RootState) => ({
  activeFilter: selectVisibilityFilter(store),
});

const mapDispatch = {
  setFilter: (payload: any) => setFilter(payload),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(VisibilityFilters);
