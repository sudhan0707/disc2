/**
 * Equinix - Responsive Main Theme
 * Copyright 2015 
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl(BiPartiteData) {
	
	   /**
     * states - Data used in Advanced Form view for Chosen plugin
     */
    this.states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

	this.report =  {
		title: 'Current Vs Predicted Revenue - IBX / Risk Profile View',
		periodMonth: ['6M', 'select'],
		metro: ['Silicon Valley','select'] ,
		currentMonth: ['Jan 2015','select']
	};

	this.d3Data = [
        {name: "Greg", score:98},
        {name: "Ari", score:96},
        {name: "Loser", score: 48}
      ];
  	
  	this.periodMonth = [
        '3 Months',
        '6 Months',
        '9 Months',
        '12 Months'
    ];

  	this.partitieData = BiPartiteData;
};


angular
    .module('disc')
    .controller('MainCtrl', MainCtrl);