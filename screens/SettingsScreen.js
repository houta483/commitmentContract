import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import SummaryCard from '../components/Summary'

export default function SettingsScreen() {
  /**
   * List all current commitmetns here with the timer, dollar value, partner, and so forth next to it
   * Make the page scrollable
   */
  return (
    <ScrollView>
      <SummaryCard />
    </ScrollView>
  )
}

SettingsScreen.navigationOptions = {
  title: 'Current Commitments',
};
