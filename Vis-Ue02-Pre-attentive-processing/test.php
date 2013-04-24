<?php
include_once './design_head.php';
?>

<div class="page-header">
    <h1></h1>

</div>
<div class="row-fluid">

    <div class="span4">
        <div id="left" class="well choice" style="margin-top: 125px;">

        </div>  
    </div>
    <div class="span4">
        <div id="up" class="well choice">

        </div> 
        <div id="overlay" style="position: absolute; width: 300px; height: 80px; padding-top: 13px; background-color:rgba(214, 214, 214, 1); text-align: center;">
            <span class="lead"></span>
        </div>
        <div class="row-fluid" style="margin: 10px; height: 100px;">
            <div class="row-fluid">
                <div class="span4 offset4">
                    <span class="iconFont key">
                        &#238;
                    </span>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span4">
                    <span class="iconFont key">
                        &#243;
                    </span>
                </div>
                <div class="span4">
                    <span id="timer" class="lead"></span>
                </div>

                <div class="span4">
                    <span class="iconFont key">
                        &#241;
                    </span>
                </div>
            </div>
            <div class="row-fluid">
                <div class="span4 offset4">
                    <span class="iconFont key">
                        &#239;
                    </span>
                </div>
            </div>
        </div>
        <div id="down" class="well choice">

        </div> 
    </div>
    <div class="span4" style="margin-top: 125px;">
        <div id="right" class="well choice">

        </div> 
    </div>
</div>

<?php
include_once './design_footer.php';
if (isset($_REQUEST["type"])) {
    $test = $_REQUEST["type"];
    $typeParts = explode("-", $test);
    $type = $typeParts[0];
    $mode = $typeParts[1];
    $testNice = str_replace("-", " ", $test);
    ?>
    <script type="text/javascript">
        $(".page-header").find("h1").text("Test: <?php echo $testNice ?>");
        initialiseTest("<?= $type ?>",<?= $mode ?>Mode, $(".choice"), $("#overlay"), $("#timer"),
                function(resultsArray) {
                    localStorage["<?= $test ?>"] = JSON.stringify(resultsArray);
                    setTimeout(function() {
                        window.location.replace("./");
                    }, 1500);
                });
    </script>
    <?php
}
?>
