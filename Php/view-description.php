<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HouseSearchKE</title>
    <link rel="stylesheet" href="../Css/style-viewdescription.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@500;600&family=PT+Sans&display=swap" rel="stylesheet">
    <script src="../Javascript/viewdescription.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body>
    <div class="container">
        <nav>
            <h1>HousesearchKE.com</h1>
            <button id="back-button" onclick="history.back()" onmouseenter="zoomDiv(this)" onmouseleave="unzoomDiv(this)">Back</button>                                
        </nav>
        <div class="top-section">
            <div class="buttons left">
                <button onclick="viewLeft('img.viewimage', '#tally-paragraph')"><img src="../Images/left button.png" alt="left-button"></button>
            </div>
            <div class="images-and-tally">
                <?php
                    for($i=0; $i<count($images); $i++) {
                        echo '<img class="viewimage" id="image' . ($i+1) . '" src="'. $rentalPhotoPath . $images[$i] . '" alt="image' . ($i+1) . '">';
                    }
                ?>               
            </div>             
            <div class="buttons right">
                <button onclick="viewRight('img.viewimage', '#tally-paragraph')"><img src="../Images/right button.png" alt="right-button"></button>
            </div>            
        </div>

        <div class="tally">
            <p id="tally-paragraph"> 1 of <?php echo count($images); ?></p>
        </div>

        <div class="bottom-section">
            <div class="rental-description">
                <h2>Rental Description</h2>
                <h3>Ksh. <?php echo $amountOfRent; ?></h3>
                <h4>Per <?php echo $rentalTerm; ?></h4>
                <div class="details">

                    <?php
                        if($rentalType === "Business Premise") {
                            echo '<p><span>Rental Type: </span>' . $typeOfBusinessBusiness . '</p>';
                        } else {
                            echo '<p><span>Rental Type: </span>' . $rentalType . '</p>';
                        }
                    ?>
                    <p><?php echo "<span>Rental Name: </span>" . $rentalName; ?></p>
                    <?php 
                        if($rentalType === "Suite") {
                            echo '<p><span>Number Of Beds Per Suite: </span>' . $numberOfBedsPerSuite . '</p>';
                        } else if ($rentalType === "Apartment") {
                            echo '<p><span>Number Of Bedrooms Per Apartment: </span>' . $numberOfApartmentBedrooms . '</p>';
                        } else if ($rentalType === "House") {
                            echo '<p><span>Number Of Bedrooms Per House: </span>' . $numberOfHouseBedrooms . '</p>';
                        } else if (($rentalType === "Hostel") || ($rentalType === "Bedsitter") || ($rentalType === "Single Room")) {
                            echo '<p><span>Maximum Number Of Occupants Per Unit: </span>' . $maximumNumberOfOccupants . '</p>';
                        }

                    ?>
                    <p><?php echo "<span>Location: </span>" . $location; ?></p>
                    <?php if($googleLocation !== "") {echo "<p><span>Google Location: </span>" . $googleLocation . "</p>";}?>
                    <p><?php echo "<span>Number Of Units Remaining: </span>" . $numberOfSimilarUnits; ?></p>
                    
                </div>
                <div class="description">
                    <h3>Description</h3>
                    <p><?php echo $description; ?></p>
                </div>                
            </div>
            <div class="contact-information">
                <h2>Contact Information</h2>
                <p id="prompt">Do You Like What You See?</p>
                <button id="view-details" onclick="viewContactDetails()" onmouseenter="zoomDiv(this)" onmouseleave="unzoomDiv(this)">View Details For Free</button>
                
                <form action="" class="contacts" style="display: none;" method="post">
                    <label for="landlords-name">Landlord's Name</label>
                    <input type="text" id="landlords-name" value="<?php echo $rentalOwnersFullName; ?>"disabled>
                    <label for="landlords-phone-number">Phone Number</label>
                    <input type="number" id="landlords-phone-number" value="<?php echo $ownersPhoneNumber; ?>"disabled>
                    <label for="landlords-email">Email Address</label>
                    <input type="text" id="landlords-email" value="<?php echo $ownersEmailAddress; ?>"disabled>
                    <input type="hidden" name="rental-type" value="<?php echo $rentalType;?>">
                    <input type="hidden" name="rental-ID" value="<?php echo $rentalID;?>">
                    <input type="hidden" name="number-of-units" value="<?php echo $numberOfSimilarUnits;?>">
                </form>

                <p id="request"> <span>Optional:</span> You may Also Leave Your Details If You Want Just In Case The Demand For The <?php echo $rentalType;?> Is High - To Guarantee That You "Book" The Rental</p>

                <button id="leave-details" onclick="viewTenantForm()" onmouseenter="zoomDiv(this)" onmouseleave="unzoomDiv(this)">Leave Details</button>

                <form action="" class="tenant-details" style="display: none;" method="post" onsubmit="validateForm(event)">
                    <div class="name">
                        <label for="tenants-name">Name</label>
                        <input type="text" id="tenants-name" name="tenants-name" onblur="validateField('tenants-name', 'Please Give Your Name')">
                        <div class="error"></div>
                    </div>
                    
                    <div class="number">
                        <label for="tenants-phone-number">Phone Number</label>
                        <input type="number" id="tenants-phone-number" name="tenants-phone-number" onblur="validatePhoneNumber(null)">
                        <div class="error"></div>
                    </div>
                    
                    <div class="email">
                        <label for="tenants-email">Email Address</label>
                        <input type="text" id="tenants-email" placeholder="Optional: abcd@gmail.com" name="tenants-email"  onblur="validateEmail(null)">
                        <div class="error"></div>
                    </div>

                    <input type="hidden" name="rental-type" value="<?php echo $rentalType;?>">
                    <input type="hidden" name="rental-ID" value="<?php echo $rentalID;?>">
                    <input type="hidden" name="interested-parties" value="<?php echo $interestedParties;?>">

                    <button type="Submit" id="submit-tenant-details" onmouseenter="zoomDiv(this)" onmouseleave="unzoomDiv(this)">Submit</button>
                </form>

            </div>                            
        </div>
        <?php 
            if((gettype($refinedAmmenities[0]) === "string") || (gettype($refinedPreferences[0]) === "string")) {
                echo '<div class="ammenities-and-preferences">';
                    if(gettype($refinedAmmenities[0]) === "string") {
                        echo '
                            <div class="ammenities">';
                                $nonNullAmmenities = 0;
                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                    if($refinedAmmenities[$i] != null) {
                                        $nonNullAmmenities++;
                                    }
                                }

                                if($nonNullAmmenities > 0) {
                                    
                                    echo '
                                    <div class="ammenities-title">
                                        <h3>Ammenities</h3>
                                    </div>
                                    <div class="actual-ammenities">';
                                        if((in_array("Tap Water", $refinedAmmenities)) || (in_array("Water Tank", $refinedAmmenities)) || (in_array("Borehole", $refinedAmmenities))) {
                                            echo '<div class="clean-water">
                                                <h4>Water</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Tap Water") || ($refinedAmmenities[$i] === "Water Tank") || ($refinedAmmenities[$i] === "Borehole")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';                            
                                        }

                                        if((in_array("Token", $refinedAmmenities)) || (in_array("Individual Sub-Meter", $refinedAmmenities))) {
                                            echo '<div class="electricity">
                                                <h4>Electricity</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Individual Sub-Meter") || ($refinedAmmenities[$i] === "Individual Token")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';
                                        }
                                        
                                        if((in_array("Security Guard", $refinedAmmenities)) || (in_array("Cctv", $refinedAmmenities)) || (in_array("Security Lights", $refinedAmmenities))) {
                                            echo '<div class="security">
                                                <h4>Security</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Security Guard") || ($refinedAmmenities[$i] === "Cctv") || ($refinedAmmenities[$i] === "Security Lights")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>'; 
                                        }

                                        if((in_array("Pit Latrine", $refinedAmmenities)) || (in_array("Flashing Toilet", $refinedAmmenities))) {
                                            echo '<div class="washrooms">
                                                <h4>Washrooms</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Pit Latrine") || ($refinedAmmenities[$i] === "Flashing Toilet")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';
                                        }

                                        if((in_array("Garbage Collection", $refinedAmmenities)) || (in_array("Cleaner", $refinedAmmenities)) || (in_array("Sink", $refinedAmmenities))) {
                                            echo '<div class="cleaning">
                                                <h4>Cleaning</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Garbage Collection") || ($refinedAmmenities[$i] === "Cleaner") || ($refinedAmmenities[$i] === "Sink")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';
                                        }

                                        if((in_array("Handicap Access", $refinedAmmenities)) || (in_array("Packing", $refinedAmmenities))) {
                                            echo '<div class="accessibility">
                                                <h4>Accessibility</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Handicap Access") || ($refinedAmmenities[$i] === "Packing")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';
                                        }

                                        if((in_array("Tiles", $refinedAmmenities)) || (in_array("Ceiling", $refinedAmmenities)) || (in_array("Balcony", $refinedAmmenities))) {
                                            echo '<div class="finishing">
                                                <h4>Finishing</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Tiles") || ($refinedAmmenities[$i] === "Ceiling") || ($refinedAmmenities[$i] === "Balcony")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';
                                        }

                                        if((in_array("Wi-Fi", $refinedAmmenities)) || (in_array("Joint TV Subscription", $refinedAmmenities)) || (in_array("Air Conditioning", $refinedAmmenities)) || (in_array("Furnished", $refinedAmmenities)) || (in_array("Gym", $refinedAmmenities)) || (in_array("Swimming Pool", $refinedAmmenities))) {
                                            echo '<div class="luxury">
                                                <h4>Luxury</h4>';
                                                for($i=0; $i<count($refinedAmmenities); $i++) {
                                                    if(($refinedAmmenities[$i] === "Wi-Fi") || ($refinedAmmenities[$i] === "Joint TV Subscription") || ($refinedAmmenities[$i] === "Air Conditioning") || ($refinedAmmenities[$i] === "Furnished") || ($refinedAmmenities[$i] === "Gym") || ($refinedAmmenities[$i] === "Swimming Pool")) {
                                                        echo '<p>'. $refinedAmmenities[$i] . '</p>';
                                                    }                                
                                                }                                
                                            echo '</div>';
                                        }
                                    echo '</div>';                        
                                }
                            echo '</div>';
                    }
                    
                    if(gettype($refinedPreferences[0]) === "string") {
                        echo '<div class="preferences">';
                            $nonNullPreference = 0;
                            for($i=0; $i<count($refinedPreferences); $i++) {
                                if($refinedPreferences[$i] != null) {
                                    $nonNullPreference++;
                                }
                            }

                            if($nonNullPreference > 0) {
                                echo '<h3>Tenant Preferences</h3>';
                                for($i=0; $i<count($refinedPreferences); $i++) {
                                    if($refinedPreferences[$i] != null) {
                                        if($refinedPreferences[$i] === "Christianity") {
                                            echo '<p>Christians</p>';
                                        } else if($refinedPreferences[$i] === "Buddhism") {
                                            echo '<p>Buddists</p>';
                                        } else if($refinedPreferences[$i] === "Islam") {
                                            echo '<p>Muslims</p>';
                                        } else if($refinedPreferences[$i] === "Hinduism") {
                                            echo '<p>Hindus</p>';
                                        } else if($refinedPreferences[$i] === "Vehicles Allowed") {
                                            echo '<p>People With Vehicles Are Welcome (Parking Available)</p>';
                                        } else {
                                            echo '<p>'. $refinedPreferences[$i] . '</p>';
                                        }                            
                                    }
                                }
                            } 
                        
                        echo '</div>';
                    }
                echo '</div>';
            }
        ?>              
        <?php 
            if ($rules[0] != "") {
                echo '
                    <div class="rules">
                        <div class="rules-button left">
                            <button onclick="viewLeft(\'img.viewrulesimage\', \'#rules-tally-paragraph\')"><img src="../Images/left button.png" alt="left-button"></button>
                        </div>
                        <div class="rules-images-and-tally">'; 
                            for($i = 0; $i < count($rules); $i++) {
                                echo '
                                <img class="viewrulesimage" id="rules-image-' . ($i+1) . '" src="../Image_Data/Rules/' . $rules[$i] . '" alt="image' . ($i+1) . '">';
                            }                
                echo '</div>             
                        <div class="rules-button right">
                            <button onclick="viewRight(\'img.viewrulesimage\', \'#rules-tally-paragraph\')"><img src="../Images/right button.png" alt="right-button"></button>
                        </div>
                    </div>
                    <div class="rules-tally">
                        <p id="rules-tally-paragraph"> 1 of ' . count($rules) . '</p>
                    </div>';
            }
        ?>
    </div>
</body>
</html>